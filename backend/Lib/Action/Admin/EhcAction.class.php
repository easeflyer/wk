<?php
class EhcAction extends CommonAction
{
    private $type=array(
        1=>'一类矿机',
        2=>'二类矿机',
        3=>'三类矿机',
        4=>'四类矿机',
        5=>'五类矿机',
    );
    private $level=array('Es0','Es1','Es2','Es3',
                 'Cs1','Cs2','Cs3',
                 'Os1','Os2','Os3');
    private $state=array('停止','运行');
    //private $realname=array('未认证','已通过');

    /**
     * 每日产出发放。
     * 涉及到升级 es - os
     */
    public function daylyOutput()
    {
        $msg = "";

        $model = new Model();


        $model->startTrans();
        $sql = "update adminuser a,ehclist e
                set a.amount = a.amount + e.output
                where a.type = e.id and a.state=1"; // state=1 开机状态
        $numUpdate = $model->execute($sql);
        if (!$numUpdate) {
            $this->error('挖矿奖励发放失败！');
            $model->rollback();
            return;
        }
        $time = time();
        $sql = "INSERT INTO account(amount,type,efrom,eto,createtime)
                SELECT e.output,1,'算力奖励',a.username, '{$time}'
                FROM adminuser a, ehclist e
                WHERE a.type = e.id AND a.state = 1";
        $numUpdate = $model->execute($sql);
        if (!$numUpdate) {
            $this->error('挖矿奖励发放失败！');
            $model->rollback();
            return;
        }
        $sql = "update conf set ehctotal = (select sum(amount) from adminuser) where id=1";
        if(!M()->execute($sql)){
            $this->error('挖矿奖励发放失败！');
            $model->rollback();
            return;
        }


        $model->commit();
        $msg .= "{$numUpdate}个用户挖矿奖励发放成功！<br />";

        $_SESSION['msg'] = '';
        $model = D("Adminuser");
        $userlist = $model->field("id")->select();
        foreach ($userlist as $user) {
            $model->updateUser($user['id']);
        }
        $msg .= $_SESSION['msg'];
        echo $msg;
        return;
    }

    /**
     * 此函数只是演示。功能已经完成。
     */
    public function ckUpdate()
    {
        $uid = 3;
        $model = D('Adminuser');
        echo $model->ckUpdate($uid);
    }
    /**
     * 矿机编辑
     */
    public function useredit()
    {
        if ($_POST) {
            $post = $_POST;
            if (empty($_POST['pwd'])) {
                unset($post['pwd']);
            } else {
                $post['pwd'] = md5($post['pwd']);
            }
            if (empty($_POST['cpwd'])) {
                unset($post['cpwd']);
            } else {
                $post['cpwd'] = md5($post['cpwd']);
            }
            unset($post['username']);

            $model = M('adminuser');
            if ($model->where("id='{$_POST['userid']}'")->save($post)) {
                $this->success('更新成功！');
            } else {
                echo $model->getLastSql();
                $this->error('更新失败！');
            }
        } else {
            $uid = $_GET['id'];
            $model = D('adminuser');
            $data = $model->find($uid);
            $this->assign('data', $data);
            $this->assign('type', $this->type);
            $this->assign('level', $this->level);
            $this->display();
        }
    }

    /**
     * 矿机列表 其实就是用户列表
     */
    public function manage()
    {

        //$ehcmodel = M('adminuser');
        $ehcmodel = new UserViewModel();
        $ehclist = $ehcmodel->select();
        $this->assign('type', $this->type);
        $this->assign('level', $this->level);
        $this->assign('state', $this->state);
        $this->assign('data', $ehclist);
        $this->display();
    }
    /**
     * 删除矿机用户
     */
    public function userdel()
    {
        $id = (int) $_GET[id];
        $model = M('adminuser');
        if ($model->delete($id)) {
            $this->success('删除成功');
        } else {
            echo $model->getLastSql();
            $this->error('删除失败');
        }
    }
    /**
     * 矿机类型管理
     */
    public function typemanage()
    {
        $ehcmodel = M('ehclist');
        $ehclist = $ehcmodel->select();
        $this->assign('data', $ehclist);
        $this->display();
    }
    public function edit()
    {
        $ehcmodel = M('ehclist');
        if ($_POST) {
            if (!$ehcmodel->create()) {
                $message = $ehcmodel->getError();
                $this->error($message);
                return;
            }
            if ($ehcmodel->save()) {
                $this->success('修改成功');
            } else {
                $this->error('修改失败');
            }
        } else {
            $id = (int) $_GET[id];
            $data = $ehcmodel->find($id);
            $this->assign('data', $data);
            $this->display();
        }
    }
    /**
     * 总量管理
     */
    public function totalmanage()
    {
        $confmodel = M('conf');
        if ($_POST) {
            if (!$confmodel->create()) {
                $message = $confmodel->getError();
                $this->error($message);
                return;
            }
            if ($confmodel->save()) {
                $this->success('修改成功');
            } else {
                $this->error('修改失败');
            }
        } else {
            $id = 1;
            $data = $confmodel->find($id);
            $this->assign('data', $data);
            $this->display();
        }
    }
    /**
     * 实名认证查看 审核
     */
    public function realname()
    {
        $id = (int) $_GET[id];
        $model = M('realname');
        $data = $model->where("user_id={$id}")->find();
        //echo $model->getLastSql();exit;
        $this->assign('data', $data);
        $this->display();
    }
    // ajax 调用返回是否成功。
    public function ckrname()
    {
        $id = $_POST['id'];
        $state = $_POST['state'];
        $model = M('realname');
        $re = $model->where("id='{$id}'")->save(array('state'=>$state));
        echo $re ? $state:false;
    }


    /**
     * 添加矿主
     */
    public function add()
    {
        if ($_POST) {
            $usermodel = new AdminuserModel();
            $pusername = $_POST['pusername'];
            $puser = $usermodel->where('username="'.$pusername.'"')->find();
            if (!$puser || !$usermodel->create()) {
                $message = $usermodel->getError();
                $this->error($message);
                return;
            }
            $usermodel->lastlogin = time();
            $usermodel->createtime = time();

            $usermodel->pwd = md5($usermodel->pwd);
            $usermodel->cpwd = md5($usermodel->pwd);
            $usermodel->startTrans();
            if (!$usermodel->add()) {
                $this->error('添加失败1');
            }
            $newadminid = $usermodel->getLastInsID();
            $utmodel = M('usertree');
            $utmodel->user_id = $newadminid;
            $utmodel->parent_id = $puser[id];

            if ($utmodel->add()) {
                $usermodel->commit();
                $this->success('添加成功');
            } else {
                $usermodel->rollback();
                $this->error('添加失败2');
            }
        } else {
            $type=$this->type;
            $level=$this->level;
            $this->assign('type', $type);
            $this->assign('level', $level);
            $this->display();
        }
    }
}

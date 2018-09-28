<?php
class EhcAction extends CommonAction {
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
     * 此函数只是演示。功能已经完成。
     */
    function ckUpdate(){
        $uid = 39;
        $model = D('Adminuser');
        $model->updateUser($uid);
        echo 333;
    }
    /**
     * 矿机编辑
     */
    function useredit(){
        if($_POST){
            $post = $_POST;
            if(empty($_POST['pwd'])) unset($post['pwd']);
            else $post['pwd'] = md5($post['pwd']);
            if(empty($_POST['cpwd'])) unset($post['cpwd']);
            else $post['cpwd'] = md5($post['cpwd']);
            unset($post['username']);

            $model = M('adminuser');
            if($model->where("id='{$_POST['userid']}'")->save($post)){
                $this->success('更新成功！');
            }else{
                echo $model->getLastSql();
                $this->error('更新失败！');
            }
        }else{
            $uid = $_GET['id'];
            $model = D('adminuser');
            $data = $model->find($uid);
            $this->assign('data',$data);
            $this->assign('type',$this->type);
            $this->assign('level',$this->level);
            $this->display();
        }
    }

    /**
     * 矿机列表 其实就是用户列表
     */
    function manage(){


        //$ehcmodel = M('adminuser');
        $ehcmodel = new UserViewModel();
        $ehclist = $ehcmodel->select();
        $this->assign('type',$this->type);
        $this->assign('level',$this->level);
        $this->assign('state',$this->state);
        $this->assign('data', $ehclist);
        $this->display();
    }
    /**
     * 删除矿机用户
     */
    function userdel() {
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
    function typemanage(){
        $ehcmodel = M('ehclist');
        $ehclist = $ehcmodel->select();
        $this->assign('data', $ehclist);
        $this->display();
    }
    function edit() {
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
    function totalmanage() {
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
    function realname(){
        $id = (int) $_GET[id];
        $model = M('realname');
        $data = $model->where("user_id={$id}")->find();
        //echo $model->getLastSql();exit;
        $this->assign('data', $data);
        $this->display();        
    }
    // ajax 调用返回是否成功。
    function ckrname(){
        $id = $_POST['id'];
        $state = $_POST['state'];
        $model = M('realname');
        $re = $model->where("id='{$id}'")->save(array('state'=>$state));
        echo $re ? true:false;
    }


    /**
     * 添加矿主
     */
    function add() {
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
            $this->assign('type',$type);
            $this->assign('level',$level);
            $this->display();
        }
    }  

}

?>
<?php

class PublicAction extends Action {

    function login() {
        //echo 2323232;exit;
        if ($_POST) {
            
            
            //echo md5('admin');exit;
            
            //登录处理
            //session(null);
            //echo "ss:".$_SESSION['verify'];exit;
            $username = $_POST[username];
            $pwd = $_POST[pwd];
            $code = $_POST[code];
            if (md5($code) != $_SESSION[verify]) {
                $this->error('验证码错误');
                return;
            }
            import("ORG.Util.RBAC");
            $where = "username='$username'";
            // 这里就是实例化了 当前登陆的用户。 返回用户的信息。不管是否存在。
            $userinfo = RBAC::authenticate($where, 'Adminuser');
            if (!$userinfo) {
                $this->error('帐号不存在');
                return;
            }
            if (md5($pwd) !== $userinfo[pwd]) {
                $this->error('用户名或密码错误');
                return;
            }
            $_SESSION[C('USER_AUTH_KEY')] = $userinfo[id];
            $_SESSION[username] = $userinfo[username];
            $data = array();
            $data[lastlogin] = time();
            if ($userinfo[username] == 'admin') {
                $_SESSION[C('ADMIN_AUTH_KEY')] = true;
            } else {
                $_SESSION[C('ADMIN_AUTH_KEY')] = false;
            }

            M('Adminuser')->where("id=$userinfo[id]")->save($data);
            RBAC::saveAccessList();  // 无参数 表示保存当前用户的 权限列表
            $this->success('登录成功', U('Admin/Admin/index'));
        } else {
            if ($_SESSION[C('USER_AUTH_KEY')]) {
                $this->redirect('Admin/index');
                return;
            }
            $this->display();
        }
    }

    Public function verify() {
        ob_clean();
        import("ORG.Util.Image");
        Image::buildImageVerify();
    }

    public function logout() {
        session_destroy();
        $this->success('您已经退出登录', U('Public/login'));
    }

    public function welcome() {
        $this->display();
    }

    public function daylyOutput()
    {

        if($_GET['key']!=="ehcist.com0909") return false;

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

}

?>
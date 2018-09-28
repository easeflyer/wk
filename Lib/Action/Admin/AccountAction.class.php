<?php
class AccountAction extends CommonAction
{
    public function manage()
    {
        $accmodel = M('account');
        $data = $accmodel->select();
        $this->assign('data', $data);
        $this->display();
    }
    /**
     * 官方奖励
     */
    public function award()
    {
        if ($_POST) {
            $to = $_POST['eto'];
            $accountmodel = M('account');
            $usermodel = M('adminuser');
            $accountmodel->startTrans();

            $touser = $usermodel->where("username='{$to}'")->find();

            if (!$touser) {
                $accountmodel->rollback();
                $this->error("去向用户不存在！");
            }
            $touser['amount'] += $_POST['amount'];
            if (!$usermodel->save($touser)) {
                $accountmodel->rollback();
                print_r($touser);
                $this->error("用户金额更新失败！");
            }
            $_POST['type'] = 2;// 官方空投
            $_POST['createtime'] = time();
            if (!$accountmodel->create()) {
                $message = $accountmodel->getError();
                $this->error($message);
                return;
            }
            if ($accountmodel->add()) {
                $accountmodel->commit();
                $this->success('添加成功');
            } else {
                $accountmodel->rollback();
                $this->error('添加失败');
            }
        } else {
            $type = array('内部转账','算力奖励','官方空投');
            $this->display();
        }
    }
}

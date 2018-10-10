<?php

class AccountAction extends Action
{

    private function getPost()
    {
        header('Access-Control-Allow-Headers:x-requested-with,content-type');
        header("Content-type: text/json; charset=utf-8");
        return json_decode($GLOBALS['HTTP_RAW_POST_DATA'],true);
    }
    /**
     * 内部转账
     */

    function transfer(){
        $type = array('内部转账','算力奖励','官方空投');
        $uid = $_SESSION['userid'];
        $username = $_SESSION['username'];
        $post = $this->getPost();
        $model = M('adminuser');
        $modelacc = M('account');
        $data1 = $model->find($uid);
        $data2 = $model->where("username='{$post['touser']}'")->find();

        if(!$data2){
            $re = array("state"=>'error','msg'=>'用户不存在！','data'=>'');
            echo json_encode($re);
            return;
        }

        if($_SESSION['smscode']<$post['smscode']){
            $re = array("state"=>'error','msg'=>'短信验证码错误！','data'=>'');
            echo json_encode($re);
            return;
        }

        if($data1['cpwd']!==md5($post['cpwd'])){
            $re = array("state"=>'error','msg'=>'支付密码错误！','data'=>$post['cpwd']);
            echo json_encode($re);
            return;
        }


        if($data1['amount']<$post['amount']){
            $re = array("state"=>'error','msg'=>'余额不足！','data'=>'');
            echo json_encode($re);
            return;
        }

        $model->startTrans();
        try{
            $data1['amount'] -= $post['amount'];
            if(!$model->save($data1)) throw new Exception('记账失败code:01！');
            $data2['amount'] += $post['amount'];
            if(!$model->save($data2)) throw new Exception('转账失败code:02！');
            $data = array(
                'type'=>'0',
                'amount'=>$post['amount'],
                'efrom'=> $username,
                'eto'=>$post['touser'],
                'createtime'=>time()
            );
            $modelacc->create($data);
            if(!$modelacc->add()) throw new Exception('记账失败！');
        }catch(Exception $e){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'转账失败！','data'=>$data);
            echo json_encode($re);
            return;
        }
        $model->commit();
        $re = array("state"=>'error','msg'=>'转账成功！','data'=>$re);
        echo json_encode($re);        
    }
    /**
     *  账号明细
     */
    function acclist(){
        $curuser = $_SESSION['username'];

        $model = M('account');
        $data = $model->where("efrom='{$curuser}' or eto='{$curuser}'")->order('id desc')->select();

        function fun($item){
            $curuser = $_SESSION['username'];
            $type = array('内部转账','算力奖励','官方空投');         
            $item['createtime'] = date("Y-m-d H:i:s",$item['createtime']);
            $item['type'] = $type[$item['type']];
            if($curuser == $item['efrom']) $item['amount'] = "-".$item['amount'];
            return $item;
        }
        $data1 = array_map("fun",$data);
        echo json_encode($data1);
    }
}
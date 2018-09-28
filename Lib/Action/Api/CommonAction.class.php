<?php
class CommonAction extends Action{
    /**
     * 短信接口
     * fetch 调用本网址即可。
     */
    function sendsms(){
        $code = rand(1000,9999);
        $code = 9999;
        //$re = curl('http://短信接口');
        $re = 1;
        if($re){
            $_SESSION['smscode'] = $code;
            $re = array("state"=>'success','msg'=>'发送成功！','data'=>'');
            echo json_encode($re);
            return;            
        }else{
            $re = array("state"=>'success','msg'=>'发送失败！','data'=>'');
            echo json_encode($re);
            return;            
        }
    }
}
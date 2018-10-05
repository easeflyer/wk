<?php
require('UploadHandler.php');
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

    function upload(){
        $uid = $_SESSION['userid'];
        if(!$uid)return false;
        $model = new Model();
        $sql = "select r.idnumber 
                from adminuser as a, realname as r 
                where r.user_id=a.id and a.id={$uid}";
        $idnumber = $model->query($sql)[0]['idnumber'];
        // header('Access-Control-Allow-Origin:*');
        // header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");        
        // header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE');        
        $upload_handler = new UploadHandler($idnumber);
    }

    function tt(){
        print_r($_SESSION);
    }

}
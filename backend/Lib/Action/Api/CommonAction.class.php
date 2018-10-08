<?php
require('UploadHandler.php');
class CommonAction extends Action{
    /**
     * 短信接口
     * fetch 调用本网址即可。
     */

    function sendsms(){
        $mobile = $_GET['mobile'];
        sendCheckCode($mobile);
    }

    // 弃用。
    function sendsms1(){
        // http://apih.106i.cn:8086/smssend/singleSend?user=8008001427&apikey=201810076165&mobile=15081880198&content=0909
        // apih.106i.cn:8086/smssend/batchSend?username=8008001427&apikey=201810076165&mobile=15081880198&encode=UTF-8&content=090909123
        //$apiUrl = "http://apih.106i.cn:8086/smssend/singleSend";
        $apiUrl = "http://apih.106i.cn:8086/smssend/batchSend";
        $username = "8008001427";
        $apikey = "201810076165";
        $mobile = "15081880198";
        $mobile = "13393317358";



        $code = rand(1000,9999);
        //$code = 9999;
        $code = "安全验证码:" . urlencode($code) . "，请不要发送给任何其他人。";

        $url = $apiUrl . "?username={$username}&apikey={$apikey}&mobile={$mobile}&content={$code}";
        $re = file_get_contents($url,false);

        print_r($re);exit;
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
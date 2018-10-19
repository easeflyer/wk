<?php

/**
 * 短信接口 修改以下代码即可。
    $re = sendsms($mobile, $code);
    //$code = '9999';
    //$re = "success:234234234"; 
 */

function sendCheckCode($mobile)
{
    $code = rand(1000, 9999);
    $code = "安全验证码:" . urlencode($code) . "，请不要发送给任何其他人。";
    $re = sendsms($mobile, $code);
    //$code = '9999';
    //$re = "success:234234234";

    $arrRe =explode(':',$re);
    $re = $arrRe[0];

    if ($re === "success") {
        $_SESSION['smscode'] = $code;
        $re = array("state"=>'success','msg'=>'发送成功！','data'=>'');
        echo json_encode($re);
        return;
    } else {
        $re = array("state"=>'error','msg'=>'发送失败！','data'=>'');
        echo json_encode($re);
        return;
    }
}


/**
 * username,apikey 用客户自己的。
 * http://apih.106i.cn:8086/smssend/batchSend?username=8008001430&apikey=201810095956&mobile=15081880198&content=checkcode2348
 */
function sendsms($mobile, $content)
{
    $content = urlencode($content);
    //$apiUrl = "http://apih.106i.cn:8086/smssend/singleSend";
    //$apiUrl = "http://apih.106i.cn:8086/smssend/batchSend"; // 批量高效 8086端口
    $apiUrl = "http://hx.106i.cn/smssend/"; // 80 端口 单条。
    $username = "8008001430";
    $apikey = "201810095956";
    $url = $apiUrl . "?username={$username}&apikey={$apikey}&mobile={$mobile}&content={$content}";
    return file_get_contents($url, false);
}

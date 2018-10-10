<?php

class UserAction extends Action
{
    private $type=array(
        1=>'一类矿机',
        2=>'二类矿机',
        3=>'三类矿机',
        4=>'四类矿机',
        5=>'五类矿机',
    );
    private $pAmount = array(0, 0.26, 0.27, 0.28,
                             0.31, 0.32, 0.33,
                             0.34, 0.35, 0.36);
    /**
     * 获得 fetch post json 数据
     */
    private function getPost()
    {
        header('Access-Control-Allow-Headers:x-requested-with,content-type');
        header("Content-type: text/json; charset=utf-8");
        return json_decode($GLOBALS['HTTP_RAW_POST_DATA'],true);
    }

    function changeState(){
        $post = $this->getPost();
        $model = M('adminuser');
        if($model->where("id={$post['id']}")->save($post)){
            $re = array("state"=>'success','msg'=>'修改成功！','data'=>'');
            echo json_encode($re);
        }else{
            $re = array("state"=>'error','msg'=>'修改失败！','data'=>'');
            echo json_encode($re);
        }
    }
    // 保存身份证号 
    function idSave(){
        $uid = $_SESSION['userid'];
        $post = $this->getPost();
        $model = M('realname');
        if($model->where("user_id={$uid}")->save($post)){
            $re = array("state"=>'success','msg'=>'身份证号已记录！','data'=>'');
            echo json_encode($re);
        }else{
            //$_SESSION['test1']=$model->getLastSql();
            $re = array("state"=>'error','msg'=>'身份证号记录失败！','data'=>'');
            echo json_encode($re);
        }
    }
    /**
     * 修改实名认证状态
     */
    function changeRnState(){
        $uid = $_SESSION['userid'];
        $post = $this->getPost();
        $model = M('realname');
        if( $post['realname'] && $post['idnumber'] &&
            $model->where("user_id={$uid}")->save($post)){
            $re = array("state"=>'success','msg'=>'提交成功！','data'=>$post);
            echo json_encode($re);
        }else{
            //$_SESSION['test1']=$model->getLastSql();
            $re = array("state"=>'error','msg'=>'提交失败！','data'=>$post);
            echo json_encode($re);
        }
    }


    

    /**
     * 显示、修改 个人资料
     */
    function profile(){
        $uid = $_SESSION['userid'];
        $post = $this->getPost();
        $_SESSION['post1'] = $post;
        $model = D('Adminuser');
        $data = $model->relation(true)->find($uid);
        if($post){
            if($post['pwd']) $data['pwd'] = md5($post['pwd']);
            if($post['cpwd']) $data['cpwd'] = md5($post['cpwd']);
            if($model->save($data)){
                $re = array("state"=>'success','msg'=>'资料修改成功！','data'=>'');
                echo json_encode($re);
                return;
            }else{
                $re = array("state"=>'error','msg'=>'资料修改失败！','data'=>'');
                echo json_encode($re);
                return;
            }
        }
        $data['type'] = $this->type[$data['type']];
        $re = array("state"=>'success','msg'=>'资料读取成功！','data'=>$data);
        echo json_encode($re);
    }

    /**
     * 关联矿机列表
     */
    function relatelist(){
        global $type;
        $type = $this->type;
        $uid = $_SESSION['userid'];
        $model = new Model();
        //$sql = "SELECT au.id,au.username,au.tel,au.email,au.createtime from adminuser as au,relation where au.id=relation.r_id and relation.user_id={$uid}";
    $sql = "SELECT au.id,au.username,au.type,e.output from ehclist as e,adminuser as au,relation where au.id=relation.r_id and e.id=au.type and relation.user_id={$uid}";
        $data = $model->query($sql);
        function fun($item){
            global $type;
            $item['createtime'] = date("Y-m-d H:i:s",$item['createtime']);
            $item['type'] = $type[$item['type']];
            return $item;
        }
        $data1 = array_map("fun",$data);
        echo json_encode($data1);
    }
    /**
     * 关联矿机
     * 数据库有 联合唯一索引，添加一次后，就无法添加了。
     */
    function relate(){
        $uid = $_SESSION['userid'];

        $post = $this->getPost();
        $post['user_id'] = $uid;


        if ($post['sms']!=$_SESSION['smscode']) {
            $re = array("state"=>'error','msg'=>'短信验证码错误！','data'=>'');
            echo json_encode($re);
            return;
        }

        $model = M('adminuser');
        $data = $model->where("username='{$post['username']}'")->find();
        $pwd = $data['pwd'];
        $post['r_id'] = $data['id'];

        if ($pwd !== md5($post['pwd'])) {
            $re = array("state"=>'error','msg'=>'密码错误！','data'=>'');
            echo json_encode($re);
            return;
        }        

        $model = M('relation');
        $model->create($post);

        if(!$model->add()){
            $re = array("state"=>'error','msg'=>'添加失败！','data'=>$post);
            echo json_encode($re);
            return;
        }
        $re = array("state"=>'error','msg'=>'添加成功！','data'=>$post);
        echo json_encode($re);            

    }

    /**
     * 创建矿机
     * 1）扣减 当前用户 amount
     * 2）新建用户。
     * 3）新建 usertree 关系
     */
    public function add()
    {
        // $post = array(
        //     'username'=>'user62',
        //     'type'=>'1',
        //     'pwd'=>'11111111',
        //     'cpwd'=>'22222222',
        //     'tel'=>'15033334444',
        //     'email'=>'23234@www.com',
        //     'sms'=>'9999'
        // );


        $post = $this->getPost();
        if ($post['sms']!=$_SESSION['smscode']) {
            $re = array("state"=>'error','msg'=>'短信验证码错误！','data'=>'');
            echo json_encode($re);
            return;
        }

        $post[createtime] = time();
        $post[pwd] = md5($post[pwd]);
        $post[cpwd] = md5($post[cpwd]);
        //$this->err(array('aa'=>11,'bb'=>22));
        // 判断用户登录

        $uid = $_SESSION['userid'];
        $model= M('Adminuser');
        $musertree = M('usertree');
        $accModel = M('account');
        $ehcModel = M('ehclist');

        $curUser = $model->find($uid);
        $cost = M('ehclist')->where("id={$post['type']}")->find()['price'];

        // 矿机停止
        if ($curUser['state']==0) {
            $re = array("state"=>'error','msg'=>'矿机停止！','data'=>'');
            echo json_encode($re);
            return;
        }


        // 余额不足
        if ($curUser['amount']<$cost) {
            $re = array("state"=>'error','msg'=>'余额不足 001！','data'=>'');
            echo json_encode($re);
            return;
        }

        $model->startTrans();


        // 奖励计算

        // 上级奖励
        $sql = "select a.* from adminuser as a, usertree as u where a.id=u.parent_id and u.user_id={$uid}";
        $puser = M()->query($sql)[0];
        if($puser && $puser['state']==1){
            $p = $this->pAmount[$puser['level']] - $this->pAmount[$curUser['level']];
            $pPrize = $cost * $p;
            $puser['amount'] += $pPrize;
            if($pPrize  &&  !$model->where("id={$puser['id']}")->save($puser)){
                $_SESSION['sql'] = $model->getLastSql();
                $model->rollback();
                $re = array("state"=>'error','msg'=>'创建失败！(code:06 父矿主奖励失败)','data'=>'');
                echo json_encode($re);
                return; 
            }
            $accData = Array(
                'amount'=> $pPrize, // 奖励金额 todo 这里需要计算。并且给对应的人都发放。
                'type' => 2,
                'efrom'=>$curUser['username']."开通".$this->type[$post['type']],
                'eto'=> $puser['username'],
                'createtime'=>time()
            );
            if(!$accModel->create($accData) || !$accModel->add()){
                $model->rollback();
                $re = array("state"=>'error','msg'=>'创建失败！(code:07 记账失败)','data'=>'');
                echo json_encode($re);
                return; 
            }
        }

        // 自己奖励
        $prize = $cost * $this->pAmount[$curUser['level']];
        $prize = $curUser['level']==0 ? 0:$prize;
        if ($prize) {
            $accData = array(
                'amount'=> $prize, // 奖励金额 todo 这里需要计算。并且给对应的人都发放。
                'type' => 2,
                'efrom'=>$curUser['username']."开通".$this->type[$post['type']],
                'eto'=> $curUser['username'],
                'createtime'=>time()
            );
            $accModel->create($accData);
            if (!$accModel->add()) {
                $model->rollback();
                $re = array("state"=>'error','msg'=>'创建失败！(code:05 奖励记账失败)','data'=>'');
                echo json_encode($re);
                return;
            }
        }
        // 空头奖励结束


        // 减去花销 再 加上 奖励
        $curUser['amount'] -= $cost + $prize;
        if(!$model->save($curUser)){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:01)','data'=>'');
            echo json_encode($re);
            return;
        }

        if(!$model->create($post)){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:02)','data'=>'');
            echo json_encode($re);
            return;
        }
        if(!$model->add()){
            //$this->err($post);
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:03)','data'=>'');
            echo json_encode($re);
            return;
        }

        // 建立父子关系
        $newid = $model->getLastInsID();
        $musertree->create(array('parent_id'=>$uid,'user_id'=>$newid));
        if(!$musertree->add()){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:04)','data'=>'');
            echo json_encode($re);
            return;
        }

        // 建立实名认证数据。
        $rnModel = M('realname');
        $rnModel->create(array('user_id'=>$newid));
        if(!$rnModel->add()){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:08 实名认证数据错误！)','data'=>'');
            echo json_encode($re);
            return;
        }
        $sql = "update conf set mtotal=mtotal+1 where id=1";
        if(!M()->execute($sql)){
            $model->rollback();
            $re = array("state"=>'error','msg'=>'创建失败！(code:09 总数更新失败！)','data'=>'');
            echo json_encode($re);
            return;
        }


        $model->commit();
        $re = array("state"=>'success','msg'=>'创建成功！','data'=>'');
        echo json_encode($re);
        return;

 
        //账号，登录密码，支付密码，type,手机号，邮箱
    }
    public function test()
    {
        $data = $this->getPost();
        echo $data;
    }
    /**
     * 完成登录 返回 sid
     */
    public function login()
    {
        $post = $this->getPost();
        //$post = $this->getPost();
        $username = $post[username];
        $pwd = $post[pwd];
        if (md5($post[code]) != $_SESSION[verify]) {
            $re = array("state"=>'error','msg'=>'验证码错误！','data'=>'');
            echo json_encode($re);
            return;
        }
        import("ORG.Util.RBAC");
        $where = "username='$username'";
        // 这里就是实例化了 当前登陆的用户。 返回用户的信息。不管是否存在。
        $userinfo = RBAC::authenticate($where, 'Adminuser');
        if (!$userinfo) {
            $re = array("state"=>'error','msg'=>'账号不存在！','data'=>'');
            echo json_encode($re);
            return;
        }
        if (md5($pwd) !== $userinfo[pwd]) {
            $re = array("state"=>'error','msg'=>'密码错误！','data'=>'');
            echo json_encode($re);
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
        $data = array(
            'sid'=>session_id(),
            'uid'=>$_SESSION['userid'],
            'username'=>$_SESSION['username']
        );
        $re = array("state"=>'success','msg'=>'登录成功！','data'=>$data);
        echo json_encode($re);
    }
    /**
     * 检查是否登录
     * 返回 $re
     */
    public function cklogin()
    {
        $post = $this->getPost();
        session_id($post['sid']);
        if ($_SESSION['userid']) {
            $re = array('state'=>'success','msg'=>'已登录',data=>$_SESSION);
        } else {
            $re = array('state'=>'error','msg'=>'未登录或登录已过期',data=>'');
        }

        echo json_encode($re);
    }

    // 系统概况
    public function sysinfo()
    {
        $sysinfo = array(
            'mtotal'=>0,        // 全网矿机总数
            'ehctotal'=>0,      // 全网 ehc
            'umt'=>0,           // 用户 矿池 矿机总数（全部分支）
            'uet'=>0,           // 用户 产量 总数
            'nmt'=>0,           // 一周新增 矿机
            'net'=>0,            // 一周新增 产量
            'yesterday'=>0,     // 昨日产量
            'timer'=>0,         // 倒计时
            'state'=>0          // 状态
        );
        $uid = $_SESSION['userid'];

        $model = M('conf');
        $data = $model->find();
        $sysinfo['mtotal'] = $data['mtotal'] + $data['mt_add'];
        $sysinfo['ehctotal'] = $data['ehctotal'] + $data['et_add'];

        $model = new AdminuserModel();
        $data = $model->total($uid);  // 用户总量   id 从 session 里取出来
        $sysinfo['umt'] = $data['count'];
        $sysinfo['uet'] = $data['amount'];

        $data = $model->newly();    // 新增
        $sysinfo['nmt'] = $data['count'];
        $sysinfo['net'] = $data['amount'];
        
        $data = $model->find($uid);
        $ehc = M('ehclist')->where("id={$data['type']}")->find();
        $sysinfo['yesterday'] = $ehc['output'];
        $sysinfo['timer'] = 365 - floor((time()-$data['createtime'])/86400);
        $sysifno['state'] = $data['state'];

        echo json_encode($sysinfo);
    }

    public function test1()
    {
        $model = new AdminuserModel();
        ;
        print_r($model->newly());
    }
    private function err($data){
        echo json_encode($data);
        exit;
    }
}

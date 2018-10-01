<?php
class NoticeAction extends CommonAction {
    function manage(){
        $noticemodel = M('notice');
        $noticelist = $noticemodel->select();
        $this->assign('data', $noticelist);
        $this->display();
    }
    function add() {
        if ($_POST) {
            $noticemodel = M('notice');
            $_POST['createtime'] = time();
            //$noticemodel->createtime = time();
            if (!$noticemodel->create()) {
                $message = $noticemodel->getError();
                $this->error($message);
                return;
            }
            if ($noticemodel->add()) {
                $this->success('添加成功');
            } else {
                $this->error('添加失败');
            }
        } else {
            $this->display();
        }
    }    
    function edit() {
        $noticemodel = M('notice');
        if ($_POST) {
            if (!$noticemodel->create()) {
                $message = $noticemodel->getError();
                $this->error($message);
                return;
            }
            if ($noticemodel->save()) {
                $this->success('修改成功');
            } else {
                $this->error('修改失败');
            }
        } else {
            $id = (int) $_GET[id];
            $data = $noticemodel->find($id);
            $this->assign('data', $data);
            $this->display();
        }
    }
    function del() {
        $id = (int) $_GET[id];
        $model = M('notice');
        if ($model->delete($id)) {
            $this->success('删除成功');
        } else {
            $this->success('删除失败');
        }
    }    
}

?>
<?php

class NoticeAction extends Action
{
    public function nlist()
    {
        $model = D('notice');
        $data = $model->select();
        echo json_encode($data);
    }
}

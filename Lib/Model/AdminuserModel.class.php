<?php
class AdminuserModel extends RelationModel
{
    protected $_link = array(
        'Realname'=> array(
            'mapping_type'    =>HAS_ONE,
            'class_name'  =>'realname',
            'foreign_key' =>'user_id',
        ),
    );
    protected $_validate = array(
        array('username','require','用户名不能为空'),
        array('username','','用户名必须唯一',0,'unique'),
        array('pwd','/.{8,}/','密码至少8位',2,'regex'),
        array('repwd','pwd','密码与确认密码必须一致',0,'confirm')
    );

    // select sum(amount) from `adminuser`
    // where id in(SELECT id FROM `adminuser` WHERE id>10)
    // SELECT count(id) FROM `adminuser` WHERE id>10

    /**
     * 返回 用户 $id 的所有子矿机数 和 ehc数
     */
    public function total($id=3)
    {
        $model = M('adminuser');
        $data = $model->find($id);
        $data1 = array(
            'amount'=>$data['amount'],
            'count'=>1,
        );

        $data2 = $this->re_total($id);
        $data1['amount'] += $data2['amount'];
        $data1['count']+=$data2['count'];
        return $data1;
    }
    /**
     * 所有子元素的和
     * 1 计算子元素 个数count,金额amount。
     * 2 循环 对每个子元素 返回 子元素 个数和金额。
     */
    public function re_total($id=3)
    {
        $model = M('usertree');
        $ids = $model->field('user_id')->where("parent_id={$id}")->select();
        $subSql = $model->field('user_id')->where("parent_id={$id}")->select(false);
        $data = $this->field('sum(amount) as amount, count(id) as count')
                ->where("id in ".$subSql)->find();
        // 子元素 count,amount
        if (count($ids)) {
            foreach ($ids as $value) {
                $sdata = $this->re_total($value['user_id']);
                $data['count'] += $sdata['count'];
                $data['amount'] += $sdata['amount'];
            }
        }
        return $data;
    }
    /**
     * 一周新增
     * return Array
            (
                [count] => 4
                [amount] => 2303.00
            )
     */
    public function newly($id=3)
    {
        function refun($id)
        {
            $ids = array();
            $model = M('usertree');
            $data = $model->where("parent_id={$id}")->select();
            foreach ($data as $v) {
                array_push($ids, $v['user_id']);
                $ids = array_merge($ids, refun($v['user_id']));
            }
            return $ids;
        }
        $time = time();
        $week = 7 * 24 * 3600;  // 7 天新增
        $ids = implode(",", refun($id));
        $model = new AdminuserModel();
        $data = $model->field('count(id) as count,sum(amount) as amount')->
                where("{$time}-createtime<{$week} and id in({$ids})")->find();
        return $data;
    }
}

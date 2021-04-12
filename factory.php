<?php
    require_once('addUser.php');

    class Factory{
        private $data;
        public function __construct(
            $data
            )
        {
            $this->data = $data;
            $this->working();
        }
        private function working()
        {
            if($this->data['method'] == 'add'){
                $newUser = new AddUser($this->data['user']) ;
            }
        }
    }



?>
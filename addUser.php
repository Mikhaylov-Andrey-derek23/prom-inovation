<?php
    require_once('WorkingWithFiles.php');


    class AddUser{
        private $user;
        public function __construct(
            $user
        )
        {
            $this->user = $user;
            $this->add();
        }

        private function add()
        {
            $user = $this->user;
            $answer['result'] = false;
            $answer['status'] = [];

            if($user['pass'] != $user['passRepeat'])
            {
                array_push($answer['status'], 'errorPass');
            }
            if(!strpos($user['email'], '@')){
                array_push($answer['status'], 'errorEmail');

            }
            if(WorkingWithFiles::findElement('email', $user['email']))
            {
                array_push($answer['status'], 'errorDoubleEmail');
            } 
            if(count($answer['status']) == 0){
               
                unset($user['passRepeat']);
                WorkingWithFiles :: setData($user);
                $answer['result'] = true;
            }
            

            print_r(json_encode($answer)); 
        }
    }



?>
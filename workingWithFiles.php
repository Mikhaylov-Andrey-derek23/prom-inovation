<?php

class WorkingWithFiles{

    static private $fileName = "data.txt";
    static private $log = "log.txt";


    public static function setData($data)
    {
        $file = fopen(self::$fileName, "a+");
        $write = fwrite($file, json_encode($data)."\n");
        if($write)
        {
            WorkingWithFiles::writeLog('Successful added a new user with id :'.$data['id']);
            fclose($file);
            return true;
        }else{
            WorkingWithFiles::writeLog('Error added');
            fclose($file);
            return false; 
        }
        

    }

    public static function getData()
    {
        $file = fopen(self::$fileName, "r");
        $data = [];
        if ($file){
            while (!feof($file))
            {
                $line = fgets($file, 999);
                try{
                    array_push($data, json_decode($line, true));
                }catch(Exception $e){
                    
                }

            }
            fclose($file);
            return $data;
        }else{
            fclose($file);
            return false;
        }
        
    }

    public static function writeLog($message){
        $file = fopen(self::$log, 'a+');
        fwrite($file, date( "d.m.y H:i:s" ).' - '.$message."\n");
        fclose($file);    
    }

    public static function findElement($field, $meaning){
        $result = false;
        $data = WorkingWithFiles::getData();
        foreach($data as $d){
            if(isset($d[$field]) and $d[$field] == $meaning){
                $result = true;
            }
        }
        return $result;
    }

};

?>
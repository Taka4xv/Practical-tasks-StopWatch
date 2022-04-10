'use strict';
$(document).ready(function(){
    let setTimeoutId = undefined;//undefined未定義という意味
    let StartTime = 0;//ｽﾀｰﾄ時間
    let CurrentTime = 0;//10msごとに更新
    let ElapsedTime = 0;//経過時間 
    let StartNoneActive=true;
    let StopNoneActive=false;
    let ResetNoneActive=false;
    
    function RunTimer(){
        CurrentTime = Date.now();
        ShowTime();
        setTimeoutId = setTimeout(() => {
            RunTimer();
        },10)
    }
        
    function ShowTime(){
        let d = new Date(CurrentTime -StartTime + ElapsedTime);
        const Min = d.getMinutes();
        const Sec = d.getSeconds();
        const Msec = Math.floor(d.getMilliseconds()/10);
        //Math.floorは実数の最大整数値を表示する
        $("#timer").text(`
        ${String(Min).padStart(2,"0")}:
        ${String(Sec).padStart(2,"0")}:
        ${String(Msec).padStart(2,"0")}`)
        //padStartは表示する桁数設定
    }
    
    function StartFunction(){
        StartNoneActive = document.getElementById("start_btn");
        StartNoneActive.disabled = true;
        StopNoneActive = document.getElementById("stop_btn");
        StopNoneActive.disabled = false;
        ResetNoneActive = document.getElementById("reset_btn");
        ResetNoneActive.disabled = false;
        //ボタンの無効、有効を設定可能
    }
    function StopFunction(){
        StartNoneActive = document.getElementById("start_btn");
        StartNoneActive.disabled = false;
        StopNoneActive = document.getElementById("stop_btn");
        StopNoneActive.disabled = true;
        ResetNoneActive = document.getElementById("reset_btn");
        ResetNoneActive.disabled = false;
    }
    function ResetFunction(){
        StartNoneActive = document.getElementById("start_btn");
        StartNoneActive.disabled = false;
        StopNoneActive = document.getElementById("stop_btn");
        StopNoneActive.disabled = true;
        ResetNoneActive = document.getElementById("reset_btn");
        ResetNoneActive.disabled = true;
    }
    
    $("#start_btn").click(function(){
        if($(this).hasClass("disabled")){
            return;
        }
        StartFunction()
        StartTime = Date.now();
        RunTimer();
    });
    
    $("#stop_btn").click(function(){
        if($(this).hasClass("disabled")){
            return;
        }
        StopFunction()
        ElapsedTime += CurrentTime - StartTime;
        clearTimeout(setTimeoutId);
    });
    
    $("#reset_btn").click(function(){
        if($(this).hasClass("#disabled")){
            return;
        }
        ResetFunction();
        clearTimeout(setTimeoutId);
        ElapsedTime = 0;
        $("#timer").text("00:00:00");
    });
});
function start() {
    $('#choose').addClass('hide');
    $('#start-animation').removeClass('hide');

    // 重置位置确保从正确位置开始
    $('.up').css('top', '-300px').removeClass('separate-up');
    $('.down').css('top', '100vh').removeClass('separate-down');

    // 开始闭合动画
    $('.up').addClass('to-center-up');
    $('.down').addClass('to-center-down');

    // 1秒后闭合完成，等待0.5秒，然后开始分离
    setTimeout(() => {
        // 移除闭合动画类
        $('.up').removeClass('to-center-up');
        $('.down').removeClass('to-center-down');

        // 开始分离动画
        $('.up').addClass('separate-up');
        $('.down').addClass('separate-down');

        // 分离完成后可以跳转页面或执行其他操作
        setTimeout(() => {
            //调用主线程
        }, 1000);

    }, 1500); // 闭合时间(1s) + 停留时间(0.5s)
}
$('#btn-1').on('click', () => {
    start();
    const audio = new Audio('/assets/start.mp3');
    audio.play();

});

// 按ESC键可以重置查看效果
$(document).keydown(function (e) {
    if (e.keyCode === 27) { // ESC键
        $('#start-animation').addClass('hide');
        $('#choose').removeClass('hide');
        $('.up').removeClass('to-center-up separate-up');
        $('.down').removeClass('to-center-down separate-down');
    }
});
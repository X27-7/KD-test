//1.两个全局常量

//__dirname 获取当前文件所在的文件夹的绝对路径

//__filename 获取文件的完整绝对路径,包含了自身文件的名字

//path.join 用于拼接多个路径

//path.resolve 对路径进行解析,得到的是当前文件所在的绝对路径

//异同
//1.都能够识别当前系统所使用的路径分隔符,并且将结果转换成当前系统所能使用的路径分隔符

//2.join方法,只是将多个路径进行单纯拼接

//3.resolve方法,解析路径,如果传入的路径是以"/"开头的,那么resolve会自动的将/解析成根路径

//4.resolve方法中的路径,使用"./"这种相对路径,那么resolve也会解析成相对路径,和当前的绝对路径进行拼接
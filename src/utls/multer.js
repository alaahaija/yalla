import multer from "multer";
function fileUpload(){
    const storage = multer.diskStorage({});
    function fileFilter (err,file,cb){
        if(['image/jpeg','image/png','image/webp','image/svg+xml'].includes(file.mimetype)){
            cb(null,true);
        }else{
            cb("invalid data",false);
        };
    };
    const upload = multer({fileFilter,storage});
    return upload;
};
export default fileUpload
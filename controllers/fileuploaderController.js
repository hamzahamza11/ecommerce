const SingleFile = require('../modules/singlefile');
const MultipleFile = require('../modules/multiplefile');

const singleFileUpload = async (req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
            
        });
        await file.save();
        res.json(file);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const singleFileUpdate = async (req, res, next) => {
    console.log(req.file.originalname)
    try{
        
        
        SingleFile.findOneAndReplace(req.params.singleFileId,{
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
            }).then(f=>s.save);
       


        
        res.status(201).send('File Updated Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const singleFileDelete = async (req, res, next) => {
    console.log(req.file.originalname)
    try{
        
        
        await SingleFile.findOneAndDelete(req.params.singleFileId)
     
        res.status(201).send('File Updated Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}




const multipleFileUpload = async (req, res, next) => {
   
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
       
        const multipleFiles = new MultipleFile({
          title:"hamza",
            files: filesArray 
        });
        
        const res11= await multipleFiles.save();
        console.log( req.body.title)
        res.json(multipleFiles);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const getallMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}



const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles,
    singleFileUpdate,
    singleFileDelete
}
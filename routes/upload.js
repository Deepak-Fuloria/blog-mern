const uploadImage = async (req, res, next) => {
    //  const form = formidable({ multiples: true });
    var form = new formidable.IncomingForm();
    let filesname = "";
    form.parse(req, async (err, fields, files) => {
      // console.log("🚀 ~ file: index.js:44 ~ form.parse ~ files:-----", files.file.filepath)
      var oldpath = files.file.filepath;
      console.log("reached here",fields)
      
      const newPath =
        path.join(__dirname, "../client/build/") +
        files.file.newFilename +
        files.file.originalFilename;
        // console.log("reached here",newPath)
      fs.rename(oldpath, newPath, function (err) {
        if (err) throw err;
        filesname = files.file.newFilename + files.file.originalFilename;
        console.log("🚀 ~ file: index.js:57 ~ File:", files)
        console.log("🚀 ~ file: index.js:57 ~ originalFilename:", files.file.originalFilename)
        console.log("🚀 ~ file: index.js:57 ~ newFilename:", files.file.newFilename)
        console.log("🚀 ~ file: index.js:51 ~ filesname:", filesname)
        res.send("file uploaded succesfully")
      });
    });
  };





  module.exports={uploadImage}








const uploadImage = (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, 'client', 'build', 'temp'),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).send('Error while processing form.');
    }

    console.log(req)
    console.log("reached here", files.file)
    var oldpath = files.file.filepath;
    const newpath = path.join(__dirname, 'client', 'build', 'uploads', files.file.originalFilename);

    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.error('File rename error:', err);
        return res.status(500).send('Error while renaming file.');
      } else {
        res.send("file uploaded successfully");
      }
    });
  });
};




module.exports = uploadImage 
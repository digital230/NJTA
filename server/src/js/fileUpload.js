
// // const express = require('express');
// const aws = require('aws-sdk');
// // const multerS3 = require('multer-s3');
// // const multer = require('multer');

// const spacesEndpoint = new aws.Endpoint('ewr1.vultrobjects.com');
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint
// });

// // const upload = multer({
// //     storage: multerS3({
// //       s3: s3,
// //       bucket: 'nj-image-bucket-main',
// //       acl: 'public-read',
// //       key: function (req, file, cb) {
// //         console.log(file);
// //         cb(null, file.originalname);
// //       }
// //     })
// //   }).array('upload', 1);
  

FilePond.registerPlugin(
    FilePondPluginMediaPreview,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateType

)

// FilePond.setOptions({
//     stylePanelAspectRatio: 3000 / 1920,
//     imageResizeTargetWidth: 1920,
//     imageResizeTargetHeight: 3000,
//     server: {
//         url: "https://wwww.ewr1.vultrobjects.com",
//         process: function (fieldName, file, metadata, load, error, progress, abort) {

//             s3.upload({
//                 Bucket: 'nj-image-bucket-main',
//                 Key: Date.now() + '_' + file.name,
//                 Body: file,
//                 ContentType: file.type,
//                 ACL: 'public-read'
//             }, function (err, data) {

//                 if (err) {
//                     error('Something went wrong');
//                     return;
//                 }

//                 pass file unique id back to filepond
//                 load(data.Key);

//             });
//         }
//     }
// })

// const inputElement = document.querySelector('input[type="file"]');



// set up s3 connection
const vultrStorage = new AWS.Endpoint('ewr1.vultrobjects.com');
const s3 = new AWS.S3({
    endpoint: vultrStorage,
    accessKeyId: '2ME88UH5WJ48R8J6RCIR',
    secretAccessKey: 'zRRXOn2MyoONwW4yeSx4KPYMaqUGGxgA0UQS8QID'
});

const s3video = new AWS.S3({
    endpoint: vultrStorage,
    accessKeyId: 'B6EVVXCP8128UN9AW8EJ',
    secretAccessKey: 'Rq3TWT4e9HyXVuelHWuWMABPJkKjWMR56AyCeWXq'
});

document.addEventListener('DOMContentLoaded', function () {

    //Create FilePond object
    const imageInput = document.querySelector('input[type="file"]');
    const imagePond = FilePond.create(imageInput, {
        acceptedFileTypes: ['image/*'],
        fileValidateTypeDetectType: (source, type) => new Promise((resolve, reject) => {
            
            // Do custom type detection here and return with promise
    
            resolve(type);
        })
    });
    // imagePond.addEventListener('FilePond:processfile', e => {
    //     console.log('File added', e.detail);
    //     $('#graphicPath').change(function() {
    //         $('#ffNumber').val($(this).val());
    //     });
    // });
    




    const videoInput = document.querySelector('input[type="file"]');
    const videoPond = FilePond.create(videoInput, {
        acceptedFileTypes: ['video/*'],
        fileValidateTypeDetectType: (source, type) => new Promise((resolve, reject) => {
            
            // Do custom type detection here and return with promise
    
            resolve(type);
        })
    });


    const ffNumber = document.querySelector('input[name="ffNumber"]');
    
    imagePond.setOptions({
        instantUpload: false,
        imageResizeTargetWidth: 1920,
        imageResizeTargetHeight: 3000,
        stylePanelAspectRatio: 3000/1920,
        server: {
            process: function (fieldName, file, metadata, load, error, progress, abort) {
                
    
                s3.upload({
                    Bucket: 'nj-image-bucket-main',
                    Key: ffNumber.value + '_' + file.name,
                    Body: file,
                    ContentType: file.type,
                    ACL: 'public-read'
                }, function (err, data) {

                    if (err) {
                        error('Something went wrong');
                        return;
                    }

                    // pass file unique id back to filepond
                    load(data.Key);

                });

            }
        }


    });

    videoPond.setOptions({
        instantUpload: false,
        stylePanelAspectRatio: '16:9',
        server: {
            process: function (fieldName, file, metadata, load, error, progress, abort) {
                
    
                s3video.upload({
                    Bucket: 'nj-video-bucket-main',
                    Key: file.name,
                    Body: file,
                    ContentType: file.type,
                    ACL: 'public-read'
                }, function (err, data) {

                    if (err) {
                        error('Something went wrong');
                        return;
                    }

                    // pass file unique id back to filepond
                    load(data.Key);

                });

            }
        }


    });

    // function setBucket(){
    //     if (file.type = png || jpg || jpeg ){
    //         bucket = 'nj-image-bucket-main'
    //     } else {
    //         bucket = 'nj-video-bucket-main'
    //     }

    // }

    // FilePond.setOptions({
    //     instantUpload: false,
    //     stylePanelAspectRatio: 3000 / 1920,
    //     imageResizeTargetWidth: 1920,
    //     imageResizeTargetHeight: 3000,
    //     server: {
    //         process: function (fieldName, file, metadata, load, error, progress, abort) {
                
    
    //             s3.upload({
    //                 Bucket: 'nj-image-bucket-main',
    //                 Key: file.name,
    //                 Body: file,
    //                 ContentType: file.type,
    //                 ACL: 'public-read'
    //             }, function (err, data) {

    //                 if (err) {
    //                     error('Something went wrong');
    //                     return;
    //                 }

    //                 // pass file unique id back to filepond
    //                 load(data.Key);

    //             });

    //         }
    //     }
    // });
});



// FilePond.parse(document.body);

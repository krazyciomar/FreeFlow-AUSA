	function capturePhoto() {
		    navigator.camera.getPicture(uploadPhoto, function(message) { alert('get picture failed'); }, 
			{ quality: 50,
			  destinationType: navigator.camera.DestinationType.FILE_URI 
			}
			 );
		}
		        
		 
   function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
			options.chunkedMode = false;
			options.headers = {
				Connection: "close"
			};
			
            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://parking.ittel.com.ar/controlador.php"), win, fail, options);
	
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            //alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

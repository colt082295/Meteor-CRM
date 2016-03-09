															var takePicture = document.querySelector("#Take-Picture"),
															showPicture = document.createElement("img");
															Result = document.querySelector("#textbit");
															var canvas =document.getElementById("picture");
															var ctx = canvas.getContext("2d");
															JOB.Init();
															JOB.SetImageCallback(function(result) {
																if(result.length > 0){
																	var tempArray = [];
																	for(var i = 0; i &lt; result.length; i++) {
																		tempArray.push(result[i].Format+" : "+result[i].Value);
																		$('#barcode_qr').val(result[i].Value);
																		$('#barcode_format').val(result[i].Format);
																	}
																}else{
																	if(result.length === 0) {
																		alert("Decoding failed. Please try again or enter it manually. You might want to try having more light on the barcode. You can also try to use the alternate scanner.");
																	}
																}
															});
															JOB.PostOrientation = true;
															JOB.OrientationCallback = function(result) {
																canvas.width = result.width;
																canvas.height = result.height;
																var data = ctx.getImageData(0,0,canvas.width,canvas.height);
																for(var i = 0; i &lt; data.data.length; i++) {
																	data.data[i] = result.data[i];
																}
																ctx.putImageData(data,0,0);
															};
															JOB.SwitchLocalizationFeedback(true);
															JOB.SetLocalizationCallback(function(result) {
																ctx.beginPath();
																ctx.lineWIdth = "2";
																ctx.strokeStyle="red";
																for(var i = 0; i &lt; result.length; i++) {
																	ctx.rect(result[i].x,result[i].y,result[i].width,result[i].height); 
																}
																ctx.stroke();
															});
															if(takePicture && showPicture) {
																takePicture.onchange = function (event) {
																	var files = event.target.files;
																	if (files && files.length > 0) {
																		file = files[0];
																		try {
																			var URL = window.URL || window.webkitURL;
																			showPicture.onload = function(event) {
																				JOB.DecodeImage(showPicture);
																				URL.revokeObjectURL(showPicture.src);
																			};
																			showPicture.src = URL.createObjectURL(file);
																		}
																		catch (e) {
																			try {
																				var fileReader = new FileReader();
																				fileReader.onload = function (event) {
																					showPicture.onload = function(event) {
																						JOB.DecodeImage(showPicture);
																					};
																					showPicture.src = event.target.result;
																				};
																				fileReader.readAsDataURL(file);
																			}
																			catch (e) {
																				alert("Neither createObjectURL or FileReader are supported");
																			}
																		}
																	}
																};
															}
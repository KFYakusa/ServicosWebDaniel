exports.tempConverter = (req,res,next) =>{
  if(req.body.scale == 'c'){
    let result = ((req.body.number -32)/ 1.8)
    res.status(200).json({message: "Fahrenheit to Celsius", answer: result})
  }else if(req.body.scale =='f'){
    let result = (req.body.number * 1.8 ) + 32
    res.status(200).json({message: "Celsius to Fahrenheit", answer: result})
  }
}
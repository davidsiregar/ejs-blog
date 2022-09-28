exports.get404=(req,res,next)=>{
  res.status(404).render("404",{
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn
  })
}

exports.get500=(req,res,next)=>{
  res.status(500).render("500",{
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn
  })
}

exports.get503=(req,res,next)=>{
  res.status(503).render("503",{
    pageTitle: "Maintenance",
    path:"/503",
    isAuthenticated: req.session.isLoggedIn

  })
}
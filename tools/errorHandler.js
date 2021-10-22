const handleErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  console.log(err.message);
  // Duplicate error code
  if (err.code === 11000 && err.message.includes("index: pseudo_1"))
    errors.pseudo = "Ce pseudo est déjà pris";

  
  if (err.code === 11000 && err.message.includes("index: email_1"))
    errors.email = "Cet email est déjà associé à un compte";

  // Error fields
  if (err.message.includes("Password incorrect"))
    errors.password = "Ce mot de passe est incorrect";
  
  if (err.message.includes("Email incorrect"))
    errors.email = "Cette adresse email est incorrect";
  
  // Image errors
  if (err.message.includes('Format d\'images incorrect'))
    errors.format = "Format d'images incorrect";
  
  if (err.message.includes('Taille d\'image trop grande'))
    errors.maxSize = "Taille de l'image excedant 500ko";
  
  // Validation errors
  if (err.message.includes("user validation failed"))
    Object.values(err.errors).map(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    
  
  return errors;
};

module.exports = handleErrors;
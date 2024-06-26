// This method take error and changes them for frontend usage

export const userErrorHandler = (err) => {
    const errors = {};

    if(err.code === 11000){
        errors.email = "User with this email already exists";
        return errors;
    }

    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })

    }

    if(!Object.values(errors).length){
        return err;
    }

    return errors;
}

export const productsErrorHandler = (err) => {
    const errors = {};

    if(err.message.includes("product validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })

    }
    
    if(!Object.values(errors).length){
        return err;
    }

    return errors;
}
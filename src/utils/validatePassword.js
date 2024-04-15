const ValidatePassword = password => {
    const containUpper =/[A-Z]/
    const containNo = /\d/
    if (password?.length < 8) {
        return "Password must be minimum 8 characters long"
    }
    else if (!(containUpper.test(password))) {
        return "Must contain one uppercase character"
    }
    else if (!(containNo.test(password))) {
        return "Must contain one number"
    }
};

export default ValidatePassword;

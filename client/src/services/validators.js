export const validators = {
    registerForm(formData){
        if (formData.username && formData.email && formData.password && formData.password_conf) {
            if (formData.username.length < 6) {
                return 'Username must be at least 6 characters.';
            }
            let re = /\S+@\S+\.\S+/;
            if (!re.test(formData.email)) {
                return 'Invalid Email';
            }
            if (formData.password !== formData.password_conf) {
                return 'Password not matched';
            }
            return '';
        }
        else if (!formData.username) {
            return 'Username required.';
        }
        else if (!formData.email) {
            return 'Email required.';
        }
        else if (!formData.password) {
            return 'Password required.';
        }
        else if (!formData.password_conf) {
            return 'Confirm Password required.';
        }
    },
    loginForm(formData){
        if (formData.email && formData.password) {
            let re = /\S+@\S+\.\S+/;
            if (!re.test(formData.email)) {
                return 'Invalid Email';
            }
            return '';
        }
        else if (!formData.email) {
            return 'Email required.';
        }
        else if (!formData.password) {
            return 'Password required.';
        }
    },
    surveyForm(formData){
        if (formData.surveyname && formData.surveyslug) {
            let slug = /\S+-\S+/;
            if (!slug.test(formData.surveyslug)) {
                return 'Invalid URL Slug.';
            }
            return '';
        }
        else if (!formData.surveyname) {
            return 'Survey Name required.';
        }
        else if (!formData.surveyslug) {
            return 'Survey Slug required.';
        }
    },
    radioField(data){
        if (!data.value) {
            return 'This field is required.';
        }
    },
    responseMail(formData) {
        if (formData.email && formData.name) {
            let re = /\S+@\S+\.\S+/;
            if (!re.test(formData.email)) {
                return 'Invalid Email';
            }
            return '';
        }
        else if (!formData.name) {
            return 'Name required.';
        }
        else if (!formData.email) {
            return 'Email required.';
        }
    },
    responseSave(data) {
        if (formData.email && formData.name) {
            let re = /\S+@\S+\.\S+/;
            if (!re.test(formData.email)) {
                return 'Invalid Email';
            }
            return '';
        }
        else if (!formData.name) {
            return 'Name required.';
        }
        else if (!formData.email) {
            return 'Email required.';
        }
    },
}
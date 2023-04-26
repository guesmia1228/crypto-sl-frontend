import Cookies from "js-cookie";
import setCookie from "../components/setCookie/setCookie"
export default class backendAPI {

    constructor() {
        //LAUNCH
        //this.baseURL = "https://nefentus.com:8443/api";
        //DEV
        this.baseURL = "http://localhost:8080/api";

        this.token = Cookies.get("token");
    }

    async checkJwt(){
        try{
            const url = `${this.baseURL}/auth/checkJWTCookie`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return true;
        } catch (error) {
            return false; // or return some default value
        }
    }

    async register(formData) {
        try {
            const url = `${this.baseURL}/auth/register`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async forgotPassword(email) {
        try {
            const url = `${this.baseURL}/auth/forgot-password`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: email,
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async forgotPasswordDashboard(pass, oldpass) {
        try {
            const request = {
                newPassword: pass,
                oldPassword: oldpass
            };
            const url = `${this.baseURL}/auth/reset-password-email`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(request)
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async resetPassword(newPassword, token) {
        try {
            const request = {
                token: token,
                newPassword: newPassword
            }
            const url = `${this.baseURL}/auth/reset-password`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify(request),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async resetPasswordDashboard(token) {
        try {
            const request = {
                token: token
            }
            const url = `${this.baseURL}/auth/reset-password-auth`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(request),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async update(formData) {
        try {
            const url = `${this.baseURL}/auth/update`;
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify(formData),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
            localStorage.setItem("email", data.email);
            localStorage.setItem("contactEmail", data.contactEmail);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("business", data.business);
            localStorage.setItem("phoneNumber", data.phoneNumber);
            localStorage.setItem("username", data.username);
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${this.baseURL}/auth/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.text();
            localStorage.setItem("profile_pic", data);
            return response;
        } catch (error) {
            console.error("There was an error uploading the file:", error);
            return null;
        }
    };


    async signout() {
        try {
            const url = `${this.baseURL}/auth/signout`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            Cookies.remove("token");
            localStorage.clear();
            return response;
        } catch (error) {
            Cookies.remove("token");
            localStorage.clear();
            console.error("There was an error signing out:", error);
            return null; // or return some default value
        }
    }

    async getProfilePicture(token){
        try {
            const url = `${this.baseURL}/auth/profilePic`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            return null;
          } catch (error) {
            console.error(error);
          }
    }

    async login(username, password, longToken) {
        try {
            const url = `${this.baseURL}/auth/login`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password, rememberMe: longToken }),
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCookie("token", data.jwtToken);
            localStorage.setItem("token", data.jwtToken);
            localStorage.setItem("email", data.email);
            localStorage.setItem("contactEmail", data.contactEmail);
            localStorage.setItem("affiliateLink", data.affiliateLink);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            localStorage.setItem("business", data.business);
            localStorage.setItem("phoneNumber", data.phoneNumber);
            localStorage.setItem("username", data.username);
            localStorage.setItem('profile_pic', data.imgData);
            localStorage.setItem('roles', data.roles);
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async activateAccount(token) {
        try {
            const url = `${this.baseURL}/auth/activate`;
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: token,
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("There was an error activating the account:", error);
            return null; // or return some default value
        }
    }


    async checkPermissionAff() {

        if (!this.token) {
            // Der Benutzer ist nicht angemeldet
            return false;
        }

        const url = `${this.baseURL}/dashboard/affiliate`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to check affiliate permissions");
            }
            return true;
        } catch (error) {
            console.error("Error checking affiliate permissions:", error);
            return false;
        }
    }

    async checkPermissionVendor() {
        if (!this.token) {
            // Der Benutzer ist nicht angemeldet
            return null;
        }

        const url = `${this.baseURL}/dashboard/vendor`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to check admin permissions");
            }
            return response;
        } catch (error) {
            console.error("Error checking admin permissions:", error);
            return null;
        }
    }



    async checkPermissionAdmin() {
        if (!this.token) {
            // Der Benutzer ist nicht angemeldet
            return false;
        }

        const url = `${this.baseURL}/dashboard/admin`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to check admin permissions");
            }
            return true;
        } catch (error) {
            console.error("Error checking admin permissions:", error);
            return false;
        }
    }

    async getAdminDashboardTotalStats() {
        const url = `${this.baseURL}/dashboard/admin/data`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            }
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to get admin dashboard data");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting admin dashboard data:", error);
            return null;
        }
    }

    async getAffiliateDashboardTotalStats() {
        const url = `${this.baseURL}/dashboard/affiliate/data`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: localStorage.getItem("affiliateLink"),
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Failed to get affiliate dashboard data");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error getting affiliate dashboard data:", error);
            return null;
        }
    }

    async countAffiliate(affiliate) {
        try {
            const url = `${this.baseURL}/clicks/?affLink=${affiliate}`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("There was an error counting the affiliates:", error);
            throw error;
        }
    }

}

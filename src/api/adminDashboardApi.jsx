import Cookies from "js-cookie";
export default class adminDashboardApi {
    constructor(type) {
        //LAUNCH
        //this.baseURL = "https://nefentus.com:8443/api/dashboard/admin";
        //DEV
		if (type !== "admin")
        	type = "partner";
		this.baseURL = process.env.REACT_APP_BASE_ENDPOINT_API + `/dashboard/${type}`;
        this.token = Cookies.get("token");
    }
    async checkPermission(){
        try{
            const url = `${this.baseURL}/`;
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
            return null; // or return some default value
        }
    }

    async getTotalRegistrations(){
        try{
            const url = `${this.baseURL}/usersCount`;
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
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async getTotalClicks(){
        try{
            const url = `${this.baseURL}/clicks`;
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
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

	async getNumOrders(){
        try{
            const url = `${this.baseURL}/numOrders`;
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
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async getTotalIncome(){
        try{
            const url = `${this.baseURL}/income`;
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
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async getUsers(){
        try{
            const url = `${this.baseURL}/users`;
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
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async patchStatus(email){
        try{
            const request = {
                useremail: email,
            };            
            const url = `${this.baseURL}/users`;
            const options = {
                method: "PATCH",
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
            return true;
        } catch (error) {
            return null; // or return some default value
        }
    }

	async deactivateUser(email){
        try{           
            const url = `${this.baseURL}/users/deactivate/${email}`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return true;
        } catch (error) {
            return null; // or return some default value
        }
    }

	async deleteUser(email){
        try{           
            const url = `${this.baseURL}/users/delete/${email}`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return true;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async addUser(firstName, lastName, email, password, roles){
        try{
            const request = {
				firstName: firstName,
				lastName: lastName,
                email: email,
                password: password,
                roles: [roles]
            };            
            const url = `${this.baseURL}/users`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(request)
            };
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            return null; // or return some default value
        }
    }

	async updateUser(firstName, lastName, email, roles){
        try{
            const request = {
				firstName: firstName,
				lastName: lastName,
				email: email,
                roles: [roles]
            };            
            const url = `${this.baseURL}/users`;
            const options = {
                method: "PUT",
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
            return true;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async getRoleReport(email, password, roles){
        try{      
            const url = `${this.baseURL}/userroles`;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                }
            };
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return null; // or return some default value
        }
    }

    async getTotalIncomesPerDay() {
        try{
            const url = `${this.baseURL}/totalIncomesPerDay`;
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
            return response.json();
        } catch (error) {
            console.log(error)
            return null; // or return some default value
        }

    }
}
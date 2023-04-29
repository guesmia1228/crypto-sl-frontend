import Cookies from "js-cookie";
export default class diamondDashboardApi {
    constructor() {
        //LAUNCH
        //this.baseURL = "https://nefentus.com:8443/api/dashboard/admin";
        //DEV
        this.baseURL = process.env.REACT_APP_BASE_ENDPOINT_API + "/dashboard/diamond";
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

    async addUser(email, password, roles){
        try{
            const request = {
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
}
import Cookies from "js-cookie";
export default class vendorDashboardApi {
    constructor() {
        //LAUNCH
        //this.baseURL = "https://nefentus.com:8443/api/dashboard/admin";
        //DEV
        this.baseURL = process.env.REACT_APP_BASE_ENDPOINT_API + "/dashboard/vendor";
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

    async getIncomeLast30Days(){
        try{
            const url = `${this.baseURL}/incomeLast30Days`;
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

	async getProducts(){
		try {
			const url = `${this.baseURL}/products`;
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
			const data = await response.json();
			console.log(data)
			return data;
		} catch (error) {
			return; // or return some default value
		}
	}

	async addProduct(name, description, price, stock, imageUrl) {
		try{
			const request = {
				name: name,
				description: description,
				price: price,
				stock: parseInt(stock),
				imageUrl: imageUrl,
            };  

			const url = `${this.baseURL}/products/add`;
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
			const data = await response.json();
			return data;
		} catch (error) {
			return null; // or return some default value
		}
	}
}
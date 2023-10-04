import Cookies from "js-cookie";
export default class vendorDashboardApi {
  constructor() {
    //LAUNCH
    //this.baseURL = "https://nefentus.com:8443/api/dashboard/admin";
    //DEV
    this.baseURL =
      process.env.REACT_APP_BASE_ENDPOINT_API + "/dashboard/vendor";
    this.token = Cookies.get("token");
  }

  async checkPermission() {
    try {
      const url = `${this.baseURL}/`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
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

  async getTotalIncome() {
    try {
      const url = `${this.baseURL}/income`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
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

  async getNumOrders() {
    try {
      const url = `${this.baseURL}/numOrders`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
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

  async getTotalIncomesPerDay() {
    try {
      const url = `${this.baseURL}/totalIncomesPerDay`;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    } catch (error) {
      console.log(error);
      return null; // or return some default value
    }
  }

  async getProducts() {
    try {
      const url = `${this.baseURL}/products`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return; // or return some default value
    }
  }

  /**
   * Upsert a new product (insert if productId is null)
   */
  async upsertProduct(productId, name, description, price, stock) {
    try {
      let stockInt = -1;
      try {
        stockInt = parseInt(stock);
      } catch (error) {}

      const request = {
        productId: productId,
        name: name,
        description: description,
        price: price,
        stock: stockInt,
      };

      const url = `${this.baseURL}/products/upsert`;
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
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async uploadProductImage(productId, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${this.baseURL}/products/uploadImage?productId=${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      return null;
    }
  }

  async getSignedImagePath(productId) {
    try {
      const response = await fetch(
        `${this.baseURL}/products/image/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the product image:", error);
      return null;
    }
  }

  async deleteProduct(productId) {
    try {
      const request = {
        productId: productId,
      };

      const url = `${this.baseURL}/products/delete`;
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
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async deleteProductImage(productId) {
    try {
      const request = {
        productId: productId,
      };

      const url = `${this.baseURL}/products/deleteImage`;
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
      const data = await response.json();
      return data;
    } catch (error) {
      return null; // or return some default value
    }
  }

  async getOrders() {
    try {
      const url = `${this.baseURL}/orders`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async getInvoices() {
    try {
      const url = `${this.baseURL}/invoices`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }

  async createInvoice(amountUSD) {
    try {
      const url = `${this.baseURL}/invoice`;
      const requestBody = {
        amountUSD: amountUSD,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
      const data = await response.text();
      return data;
    } catch (error) {
      console.log(error);
      return null; // or return some default value
    }
  }

  async deleteInvoice(invoiceLink) {
    try {
      const url = `${this.baseURL}/deleteInvoice/${invoiceLink}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the orders", error);
      return null;
    }
  }
}

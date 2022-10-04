import { RESTDataSource } from 'apollo-datasource-rest';

export class DirectusAPI extends RESTDataSource {
  constructor(collection) {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'http://localhost:8055/';
    // Defaults to true (cache control)
    this.memoizeGetRequests = true;
    // Collection to return
    this.collection = collection;
  }

  async getAll() {
    // Send a GET request to the specified endpoint
    const data = await this.get(`items/${this.collection}`);
    return data.data;
  }

  async getItemById(id) {
    const data = await this.get(`items/${this.collection}/${encodeURIComponent(id)}`);
    return data.data;
  }

  async getItemsByField(field, fieldValue) {
    const data = await this.get(`items/${this.collection}?filter[${field}][_contains]=${fieldValue}`);
    return data.data;
  }

  async getNestedItem(itemId, field){
    const data = await this.get(`items/${this.collection}/${itemId}?fields=${field}.*`);
    return data.data[field];
  }
}
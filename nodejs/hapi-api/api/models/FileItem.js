export default class FileItem {
  constructor(jsonObject) {
    this.filename = ( jsonObject.filename )?jsonObject.filename:"newfile";
    if (jsonObject.template) {
      this.template = {};
      this.template.name = jsonObject.template.name;
      this.template.version = jsonObject.template.version;
    }
    this.resource = jsonObject.resource;
    this.application = jsonObject.application;
    this.priority = (jsonObject.priority)?jsonObject.priority:0;
    this.status = 'pending';
    if (jsonObject['_id']) {
      this.id = jsonObject['_id'];
    }
    this.doc = Date.now();
    this.urn = this.createUrn();
  }
  createUrn() {
    let entityHash = this.filename.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
    entityHash = (entityHash<0)?(entityHash*(-1)).toString(16):entityHash.toString(16);
    entityHash = `${entityHash}-${this.doc.toString(16)}`;
    return entityHash;
  }
  getFilename() {
    return this.filename;
  }
  getId() {
    return this.id;
  }
  getApplication() {
    return this.application;
  }
  isValid() {
    return true;
  }

  updateFromJSON(jsonObject) {
    if (jsonObject.name) {
      this.name = jsonObject.name;
    }
    if (jsonObject.location) {
      this.location = jsonObject.location;
    }
  }

  toObject(verbose=false) {
    const output = {};
    output.urn = this.urn;
    output.template = this.template;
    output.filename = this.filename;
    output.doc = this.doc;
    output.resource = this.resource;
    output.application = this.application;
    output.priority = this.priority;
    output.status = this.status;
    if (verbose) {
      output._id = this.id;
    }
    return output;
  }
  toJSON(verbose=false) {
    return JSON.stringify(this.toObject(verbose));
  }
}

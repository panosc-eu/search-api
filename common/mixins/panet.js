"use strict";

const superagent = require("superagent");

class Panet {

  constructor(baseUrl) {
    this.panetUrl = baseUrl + "/techniques/pan-ontology";
  }

  /**
   * request panet ontology to pan-ontologies service
   * @param {object} techniqueLoopbackWhere Loopback where filter with condition
   *  on a field of the technique model
   * @returns {object} Loopback where filter made of condition on list of pids:
   * e.g {and:[{pid:{inq: [1,2,3]}, {pid: {inq: [4,5,6]}}]}
   * or {or:[{pid:{inq: [1,2,3]}, {pid: {inq: [4,5,6]}}]}
   * or {pid:{inq: [1,2,3]}}
   */
  async panet(techniqueLoopbackWhere) {

    console.log(">>> Panet.panet: panet requested");
    console.log(" - original filter : ", techniqueLoopbackWhere);

    const res = await superagent
      .get(this.panetUrl)
      .query({ where: JSON.stringify(techniqueLoopbackWhere) });
    const resJSON = JSON.parse(res.text);
    await deepObjectSearchAndReplace(resJSON,
      "pid",
      () => true,
      (obj) => (obj.panetId = obj.pid, delete obj.pid)
    );
    console.log(" - expanded filter : ", resJSON);
    return resJSON
  }

}

/**
 * finds an replaces (inplace) a key value in a nested object
 * @param {object} object Any object
 * @param {string} key The key to access the object
 * @param {callable} predicate A function returning true checking for the value
 * of the object accessed using the key
 * @param {callable} callable The function to apply on the object found
 */

async function deepObjectSearchAndReplace (object, key, predicate, callable) {
  if(object.hasOwnProperty(key) && predicate(object[key]) === true)
      await callable(object);

  for(var i=0; i<Object.keys(object).length; i++){
      if(typeof object[Object.keys(object)[i]] === "object"){
          await deepObjectSearchAndReplace(
            object[Object.keys(object)[i]],
            key, predicate, callable);
      }
  }
}


module.exports = (Model) => {
  const PanetOntology = process.env.PANET_BASE_URL ?
  new Panet(process.env.PANET_BASE_URL) :
  { panet: (techniqueLoopbackWhere) => techniqueLoopbackWhere };

  // Changes filter to use PaNET
  Model.beforeRemote("find", async (ctx) => {
    if (ctx.args.filter)
      await deepObjectSearchAndReplace(
        ctx.args.filter,
        "relation",
        (v) => v === "techniques",
        async (obj) => {
          if (obj.scope && obj.scope.where)
            obj.scope.where = await PanetOntology.panet(obj.scope.where)
        }
      )
    })
}

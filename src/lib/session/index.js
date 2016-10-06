const session = {"user_object":"user","user_id":"5797b669fc2309f323a7baff","user_email":"felquis.gimenes+2@pagar.me","user_name":"Felcos","user_permission":"admin","user_date_created":"2016-07-26T19:13:45.605Z","company_id":"5240a52b1bbc9cb50e000003","company_encryption_key":{"live":"ek_live_bspDfnKtdZahowfxSxuYTdYxaaDp1v","test":"ek_test_UT6AN4fDN3BCUgo6kxUiOq6S20dbKc"},"company_name":"Pagar.me","company_status":"active","session_id":"7fea351d910d84fc00d000aaea0f929dfab10308d9cfcea624bad7352d53"}

const create = (opts, email, password) => Promise.resolve(session)
const verify = opts => Promise.resolve(1)
const destroy = opts => Promise.resolve(1)

export default {
	create,
	verify,
	destroy
}

module.exports = {
    getIndex: (req,res) => {
        res.json({
            "Hello": ["Chris", "Ben"]
        })
    }
}
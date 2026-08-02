const getHealthStatus = (req, res) => {
    res.json({
        success: true,
        status: 'ok'
    })
}

module.exports = {getHealthStatus}
export default function helperFunction(res, status, data, error, message) {
res.status(status).json({
    error,
    message,
    data: data,

})}

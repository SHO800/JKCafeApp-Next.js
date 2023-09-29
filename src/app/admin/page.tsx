const Admin = () => {
    return (
        <>
            <div className="container">
                <form action="{{ url_for('menues_csv') }}" method="POST" encType="multipart/form-data">
                    <input type="file" name="file"></input>
                    <input type="submit" value="ファイルを送信する"></input>
                </form>
            </div>
        </>
    )
}

export default Admin
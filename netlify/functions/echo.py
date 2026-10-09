# 最小测试函数，零依赖，确认 Netlify Python 函数机制本身能跑
# 注意：函数名必须与文件名相同（echo.py -> def echo）
def echo(event, context):
    import json
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "msg": "echo function works"})
    }

# cache-bust 014901

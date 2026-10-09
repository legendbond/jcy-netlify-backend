# 最小测试函数，零依赖，确认 Netlify Python 函数机制本身能跑
def handler(event, context):
    import json
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "msg": "echo function works"})
    }

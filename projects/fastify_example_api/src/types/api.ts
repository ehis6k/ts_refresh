type ApiOk<T> = {success: true; data: T };

type ApiErr = { success: false; error: string };

type ApiResult<T> = ApiOk<T> | ApiErr
# ntx-action
Testing on NTX - GitHub Action

## Inputs

### `domain`

**Required** The domain of the machine where NTX is installed. Default: `"localhost"`

### `uri`
**Required** The URI of for the request.

### `username`
**Required** The NTX username.

### `password`
**Required** The NTX password.

### `wait-time`
**Required** The domain of the machine where NTX is installed. Default: `"20"`

## Outputs

### `status`

The message with result of the test

## Example usage


**uses:** noesis-teste/ntx-action@v2
**with:**
&ensp; **domain:** 'http://localhost:8080'
&ensp; **uri:** '/NTX/ntxWebService?LinkID=178&TypeID=1...'
&ensp; **username:** foo
&ensp; **passwrod:** xpto
&ensp; **wait-time:** 10


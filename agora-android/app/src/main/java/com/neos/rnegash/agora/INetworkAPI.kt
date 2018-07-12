package com.neos.rnegash.agora

import io.reactivex.Observable
import kotlinx.coroutines.experimental.Deferred
import retrofit2.http.GET

interface INetworkAPI {

    @GET("response/user")
    fun getAllResponses(): Deferred<List<MyResponsesData>>
}
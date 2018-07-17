package com.neos.rnegash.agora

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.gson.GsonBuilder
import com.jakewharton.retrofit2.adapter.kotlin.coroutines.experimental.CoroutineCallAdapterFactory
import kotlinx.android.synthetic.main.fragment_my_responses.*
import kotlinx.coroutines.experimental.android.UI
import kotlinx.coroutines.experimental.async
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.IOException

var defaultHttpClient = OkHttpClient.Builder()
        .addInterceptor(object : Interceptor {
            @Throws(IOException::class)
            override fun intercept(chain: Interceptor.Chain): Response {
                val accessTokenPreference = PreferenceManager(MyApp.getContext()).getToken()

                //getAccessToken is your own accessToken(retrieve it by saving in shared preference or any other option )
                if (accessTokenPreference.isEmpty()) {
                    Log.e("retrofit 2", "Authorization header is already present or token is empty....")
                    return chain.proceed(chain.request())
                }
                val authorisedRequest = chain.request().newBuilder()
                        .addHeader("Authorization", accessTokenPreference).build()
                Log.e("retrofit 2", "Authorization header is added to the url....")
                return chain.proceed(authorisedRequest)
            }
        }).build()!!

class MyResponsesFragment : Fragment() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val retrofit = Retrofit.Builder().addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
                .addCallAdapterFactory(CoroutineCallAdapterFactory())
                .client(defaultHttpClient)
                .baseUrl("http://10.201.233.24:8080/").build()

        async(UI) {
            val context = this@MyResponsesFragment.context ?: return@async
            rv__list_my_answers.layoutManager = LinearLayoutManager(context)

            val responseApi = retrofit.create(INetworkAPI::class.java)
            val response = responseApi.getAllResponses().await()
            //do stuff on UI thread
            rv__list_my_answers.adapter = MyResponseItemAdapter(response, context)
        }


    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_my_responses, container, false)
    }
}


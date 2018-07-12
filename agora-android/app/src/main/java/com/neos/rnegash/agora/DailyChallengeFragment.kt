package com.neos.rnegash.agora

import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import kotlinx.android.synthetic.main.fragment_daily_challenge.*
import kotlinx.coroutines.experimental.async
import okhttp3.MediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import java.io.IOException

class DailyChallengeFragment : Fragment() {

    override fun onAttach(context: Context?) {
        super.onAttach(context)
    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
    }

    override fun onStart() {
        super.onStart()
        answerButton.setOnClickListener {
            respond()
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_daily_challenge, container, false)
    }


    private fun respond() {

        val answerInputText = answerInput.text
        val answerJSONString = "{\"response\":\"$answerInputText\", \"challengeId\":\"3\"}"

        async {
            post("http://10.201.233.23:8080/response", answerJSONString)
        }
    }


    @Throws(Exception::class)
    fun post(url: String, body: String) {
        val client = OkHttpClient()

        val JSON = MediaType.parse("application/json; charset=utf-8")

        val accessTokenPreference = PreferenceManager(this.context!!).getToken()

        val request = Request.Builder()
                .url(url)
                .addHeader("Authorization", accessTokenPreference)
                .post(RequestBody.create(JSON, body))
                .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) {
                Toast.makeText(this.context, "Sorry, something went wrong", Toast.LENGTH_SHORT).show()

                throw IOException("Unexpected code $response")

            }

            // Log.e("prefs", accessToken.toString())
            Toast.makeText(this.context, "Thanks for your response!", Toast.LENGTH_SHORT).show()



        }

    }

}

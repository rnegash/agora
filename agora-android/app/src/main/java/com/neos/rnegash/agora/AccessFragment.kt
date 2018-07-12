package com.neos.rnegash.agora


import android.os.Bundle
import android.support.v4.app.Fragment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.google.gson.Gson
import kotlinx.android.synthetic.main.fragment_access.*
import kotlinx.coroutines.experimental.android.UI
import kotlinx.coroutines.experimental.launch
import okhttp3.MediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import org.json.JSONObject
import java.io.IOException

data class MyResponse(
        val user: JSONObject?,
        val token: String?)

class AccessFragment : Fragment() {


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_access, container, false)

    }

    override fun onStart() {
        super.onStart()
        loginButton.setOnClickListener {
            login()
        }
    }

    private fun login() {
        Log.e("access", "click")
        val usernameInputText = usernameInput.text
        val passwordInputText = passwordInput.text

        val userDetails = "{\"username\":\"$usernameInputText\", \"password\": \"$passwordInputText\"}"

        launch {
            post("http://10.201.233.23:8080/access", userDetails)
            launch(UI) {
                val context = this@AccessFragment.context ?: return@launch
                Toast.makeText(context, "Successfully logged in", Toast.LENGTH_SHORT).show()
            }
        }
    }


    @Throws(Exception::class)
    fun post(url: String, body: String) {
        val client = OkHttpClient()

        val JSON = MediaType.parse("application/json; charset=utf-8")

        val request = Request.Builder()
                .url(url)
                .post(RequestBody.create(JSON, body))
                .build()

        client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) {
                throw IOException("Unexpected code $response")
            }

            val gson = Gson()
            val gsonresponse = gson.fromJson(response.body()!!.string(), MyResponse::class.java)
            val accessToken = gsonresponse.token;

            val accessTokenPreference = PreferenceManager(this.context!!)
            accessTokenPreference.setToken(accessToken!!)
            Log.e("showtoast", "showit")
        }
    }
}

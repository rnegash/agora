package com.neos.rnegash.agora

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.my_response_item_layout.*
import kotlinx.android.extensions.LayoutContainer

class MyResponseItemAdapter(val myResponseList: List<MyResponsesData>, val context: Context) :
        RecyclerView.Adapter<MyResponseItemAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(LayoutInflater.from(context).inflate(R.layout.my_response_item_layout,
                parent, false))
    }

    override fun getItemCount(): Int {
        return 10
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int){

        val item = myResponseList.get(position)
        holder.txtChallengeStatement.text = item.statement
        holder.txtChallengeQuestion.text = item.question
        holder.txtChallengeResponse.text = item.response

    }

     open class ViewHolder(override val containerView: View) : RecyclerView.ViewHolder(containerView), LayoutContainer


}